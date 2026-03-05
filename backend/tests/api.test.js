const request = require('supertest');
const { connect, clearDatabase, closeDatabase } = require('./setup');
const app = require('../app');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

// ═══════════════════════════════════════════════════════
//  API INTEGRATION TESTS (Supertest)
//  Tests HTTP routes, auth, status codes, responses
// ═══════════════════════════════════════════════════════

beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret-key';
    process.env.RAZORPAY_KEY_ID = 'test_key';
    process.env.RAZORPAY_KEY_SECRET = 'test_secret';
    await connect();
});
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

// Helper: create user and get JWT token
const createUserAndGetToken = async (email = 'user@test.com') => {
    const user = await User.create({
        name: 'Test User',
        email,
        password: 'password123',
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
};

// ─────────────── Health Check ───────────────
describe('GET /', () => {
    test('should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toContain('API is running');
    });
});

// ─────────────── Auth Routes ───────────────
describe('Auth API', () => {
    describe('POST /api/users/register', () => {
        test('should register a new user', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({ name: 'Gaurav', email: 'gaurav@test.com', password: 'pass123' });

            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
        });

        test('should reject duplicate email', async () => {
            await User.create({ name: 'A', email: 'dup@test.com', password: 'pass' });

            const res = await request(app)
                .post('/api/users/register')
                .send({ name: 'B', email: 'dup@test.com', password: 'pass' });

            expect(res.status).toBe(400);
            expect(res.body.msg).toBe('User exists');
        });
    });

    describe('POST /api/users/login', () => {
        test('should login with correct credentials', async () => {
            // Register first
            await request(app)
                .post('/api/users/register')
                .send({ name: 'Login User', email: 'login@test.com', password: 'mypass123' });

            // Login
            const res = await request(app)
                .post('/api/users/login')
                .send({ email: 'login@test.com', password: 'mypass123' });

            expect(res.status).toBe(200);
            expect(res.body.token).toBeDefined();
        });

        test('should reject wrong password', async () => {
            await request(app)
                .post('/api/users/register')
                .send({ name: 'User', email: 'wrong@test.com', password: 'correct' });

            const res = await request(app)
                .post('/api/users/login')
                .send({ email: 'wrong@test.com', password: 'incorrect' });

            expect(res.status).toBe(401);
            expect(res.body.msg).toBe('Invalid credentials');
        });

        test('should reject non-existent email', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({ email: 'nobody@test.com', password: 'pass' });

            expect(res.status).toBe(401);
        });
    });

    describe('GET /api/users/profile', () => {
        test('should get profile with valid token', async () => {
            const { token } = await createUserAndGetToken('profile@test.com');

            const res = await request(app)
                .get('/api/users/profile')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Test User');
            expect(res.body.email).toBe('profile@test.com');
            expect(res.body.password).toBeUndefined(); // Should not expose password
        });

        test('should reject request without token', async () => {
            const res = await request(app).get('/api/users/profile');
            expect(res.status).toBe(401);
        });
    });
});

// ─────────────── Vehicle Routes ───────────────
describe('Vehicle API', () => {
    describe('POST /api/vehicles', () => {
        test('should add a new vehicle', async () => {
            const res = await request(app)
                .post('/api/vehicles')
                .send({
                    model: 'TVS iQube',
                    type: 'scooter',
                    location: 'Kalyani',
                    battery: 95,
                    latitude: 22.9749,
                    longitude: 88.4495,
                });

            expect(res.status).toBe(201);
            expect(res.body.model).toBe('TVS iQube');
            expect(res.body.type).toBe('scooter');
            expect(res.body.status).toBe('available');
            expect(res.body.latitude).toBe(22.9749);
        });

        test('should reject vehicle with invalid type', async () => {
            const res = await request(app)
                .post('/api/vehicles')
                .send({ model: 'Car', type: 'car' });

            expect(res.status).toBe(500);
        });
    });

    describe('GET /api/vehicles', () => {
        test('should return available vehicles', async () => {
            await Vehicle.create({ model: 'Bike A', type: 'bike', status: 'available' });
            await Vehicle.create({ model: 'Scooter B', type: 'scooter', status: 'in-use' });
            await Vehicle.create({ model: 'Scooter C', type: 'scooter', status: 'available' });

            const res = await request(app).get('/api/vehicles');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2); // Only 'available' ones
        });

        test('should filter by location', async () => {
            await Vehicle.create({ model: 'A', type: 'bike', location: 'Kalyani' });
            await Vehicle.create({ model: 'B', type: 'bike', location: 'Kolkata' });

            const res = await request(app).get('/api/vehicles?location=kalyani');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].model).toBe('A');
        });
    });

    describe('PUT /api/vehicles/:id', () => {
        test('should update vehicle status', async () => {
            const vehicle = await Vehicle.create({ model: 'X', type: 'bike' });

            const res = await request(app)
                .put(`/api/vehicles/${vehicle._id}`)
                .send({ status: 'maintenance' });

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('maintenance');
        });
    });
});

// ─────────────── Booking Routes ───────────────
describe('Booking API', () => {
    describe('POST /api/bookings', () => {
        test('should create a booking for authenticated user', async () => {
            const { token } = await createUserAndGetToken('book@test.com');
            const vehicle = await Vehicle.create({
                model: 'Ola S1',
                type: 'scooter',
                status: 'available',
            });

            const res = await request(app)
                .post('/api/bookings')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    vehicleId: vehicle._id,
                    startTime: new Date(),
                    duration: 2,
                });

            expect(res.status).toBe(201);
            expect(res.body.duration).toBe(2);
            expect(res.body.cost).toBe(1); // duration * 0.5

            // Vehicle should now be in-use
            const updated = await Vehicle.findById(vehicle._id);
            expect(updated.status).toBe('in-use');
        });

        test('should reject booking for unavailable vehicle', async () => {
            const { token } = await createUserAndGetToken('book2@test.com');
            const vehicle = await Vehicle.create({
                model: 'Busy Bike',
                type: 'bike',
                status: 'in-use',
            });

            const res = await request(app)
                .post('/api/bookings')
                .set('Authorization', `Bearer ${token}`)
                .send({ vehicleId: vehicle._id, startTime: new Date(), duration: 1 });

            expect(res.status).toBe(400);
            expect(res.body.msg).toBe('Unavailable');
        });

        test('should reject booking without auth', async () => {
            const res = await request(app)
                .post('/api/bookings')
                .send({ vehicleId: 'abc', startTime: new Date(), duration: 1 });

            expect(res.status).toBe(401);
        });
    });

    describe('PUT /api/bookings/:id/cancel', () => {
        test('should cancel own booking', async () => {
            const { user, token } = await createUserAndGetToken('cancel@test.com');
            const vehicle = await Vehicle.create({ model: 'V', type: 'bike', status: 'in-use' });
            const booking = await Booking.create({
                user: user._id,
                vehicle: vehicle._id,
                startTime: new Date(),
                duration: 1,
                cost: 29,
            });

            const res = await request(app)
                .put(`/api/bookings/${booking._id}/cancel`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('cancelled');

            // Vehicle should be available again
            const v = await Vehicle.findById(vehicle._id);
            expect(v.status).toBe('available');
        });
    });

    describe('GET /api/bookings/mybookings', () => {
        test('should return user bookings', async () => {
            const { user, token } = await createUserAndGetToken('my@test.com');
            const vehicle = await Vehicle.create({ model: 'V', type: 'bike' });

            await Booking.create({
                user: user._id,
                vehicle: vehicle._id,
                startTime: new Date(),
                duration: 1,
                cost: 29,
            });

            const res = await request(app)
                .get('/api/bookings/mybookings')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body[0].cost).toBe(29);
        });
    });
});

// ─────────────── Chatbot Routes ───────────────
describe('Chatbot API', () => {
    describe('POST /api/chatbot', () => {
        test('should respond to pricing query', async () => {
            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: 'What is the price?' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toContain('₹29');
            expect(res.body.reply).toContain('hour');
        });

        test('should respond to booking query', async () => {
            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: 'How do I book a scooter?' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toContain('Book');
        });

        test('should respond to greeting', async () => {
            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: 'Hello' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toContain('Welcome');
        });

        test('should respond to service area query', async () => {
            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: 'Where is your service area?' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toContain('Kalyani');
        });

        test('should respond to payment query', async () => {
            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: 'How to pay?' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toContain('payment');
        });

        test('should show availability from database', async () => {
            await Vehicle.create({ model: 'Test Scooter', type: 'scooter', status: 'available' });

            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: 'Which scooters are available?' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toContain('available');
        });

        test('should show fallback for unknown query', async () => {
            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: 'xyzrandomquery123' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toContain('not sure');  // fallback has "I'm not sure"
        });

        test('should handle empty message', async () => {
            const res = await request(app)
                .post('/api/chatbot')
                .send({ message: '' });

            expect(res.status).toBe(200);
            expect(res.body.reply).toBeDefined();
        });
    });
});

// ─────────────── 404 Handler ───────────────
describe('404 Handler', () => {
    test('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/api/nonexistent');
        expect(res.status).toBe(404);
    });
});
