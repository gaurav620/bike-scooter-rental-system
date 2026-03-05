const mongoose = require('mongoose');
const { connect, clearDatabase, closeDatabase } = require('./setup');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

// ═══════════════════════════════════════════════════════
//  MODEL UNIT TESTS
//  Tests model validation, defaults, and methods
// ═══════════════════════════════════════════════════════

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

// ─────────────── User Model ───────────────
describe('User Model', () => {
    test('should create a user with hashed password', async () => {
        const user = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        });
        await user.save();

        expect(user._id).toBeDefined();
        expect(user.name).toBe('Test User');
        expect(user.email).toBe('test@example.com');
        // Password should be hashed (not plain text)
        expect(user.password).not.toBe('password123');
        expect(user.password.startsWith('$2')).toBe(true); // bcrypt hash prefix
    });

    test('should match password correctly', async () => {
        const user = new User({
            name: 'Test User',
            email: 'test2@example.com',
            password: 'mypassword',
        });
        await user.save();

        const isMatch = await user.matchPassword('mypassword');
        expect(isMatch).toBe(true);

        const isWrong = await user.matchPassword('wrongpassword');
        expect(isWrong).toBe(false);
    });

    test('should require name and email', async () => {
        const user = new User({});
        let err;
        try {
            await user.save();
        } catch (e) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors.name).toBeDefined();
        expect(err.errors.email).toBeDefined();
    });

    test('should enforce unique email', async () => {
        await User.create({ name: 'A', email: 'dup@test.com', password: '123' });
        let err;
        try {
            await User.create({ name: 'B', email: 'dup@test.com', password: '456' });
        } catch (e) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.code).toBe(11000); // Duplicate key
    });

    test('should have timestamps', async () => {
        const user = await User.create({
            name: 'TS User',
            email: 'ts@test.com',
            password: 'pass123',
        });
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
    });
});

// ─────────────── Vehicle Model ───────────────
describe('Vehicle Model', () => {
    test('should create a vehicle with defaults', async () => {
        const vehicle = await Vehicle.create({
            model: 'Ather 450X',
            type: 'scooter',
        });

        expect(vehicle.model).toBe('Ather 450X');
        expect(vehicle.type).toBe('scooter');
        expect(vehicle.status).toBe('available');   // default
        expect(vehicle.condition).toBe('good');     // default
        expect(vehicle.battery).toBe(100);          // default
        expect(vehicle.mileage).toBe(0);            // default
    });

    test('should accept latitude and longitude', async () => {
        const vehicle = await Vehicle.create({
            model: 'Ola S1',
            type: 'scooter',
            latitude: 22.9749,
            longitude: 88.4495,
        });
        expect(vehicle.latitude).toBe(22.9749);
        expect(vehicle.longitude).toBe(88.4495);
    });

    test('should only allow bike or scooter type', async () => {
        let err;
        try {
            await Vehicle.create({ model: 'Test', type: 'car' });
        } catch (e) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors.type).toBeDefined();
    });

    test('should only allow valid status values', async () => {
        let err;
        try {
            await Vehicle.create({ model: 'Test', type: 'bike', status: 'broken' });
        } catch (e) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors.status).toBeDefined();
    });

    test('should require model and type', async () => {
        let err;
        try {
            await Vehicle.create({});
        } catch (e) {
            err = e;
        }
        expect(err).toBeDefined();
        expect(err.errors.model).toBeDefined();
        expect(err.errors.type).toBeDefined();
    });
});

// ─────────────── Booking Model ───────────────
describe('Booking Model', () => {
    test('should create a booking with defaults', async () => {
        const userId = new mongoose.Types.ObjectId();
        const vehicleId = new mongoose.Types.ObjectId();

        const booking = await Booking.create({
            user: userId,
            vehicle: vehicleId,
            startTime: new Date(),
            duration: 2,
            cost: 58,
        });

        expect(booking.user.toString()).toBe(userId.toString());
        expect(booking.vehicle.toString()).toBe(vehicleId.toString());
        expect(booking.status).toBe('booked');       // default
        expect(booking.paymentStatus).toBe('pending'); // default
        expect(booking.cost).toBe(58);
    });

    test('should have timestamps', async () => {
        const booking = await Booking.create({
            user: new mongoose.Types.ObjectId(),
            vehicle: new mongoose.Types.ObjectId(),
            startTime: new Date(),
            duration: 1,
            cost: 29,
        });
        expect(booking.createdAt).toBeDefined();
        expect(booking.updatedAt).toBeDefined();
    });
});
