import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './backend/.env' });

const MONGO_URI = process.env.MONGO_URI;

console.log('Connecting to MongoDB Atlas...');
console.log('URI:', MONGO_URI.replace(/:[^:@]+@/, ':****@')); // Hide password

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
})
    .then(async () => {
        console.log('✓ Connected successfully!\n');

        const db = mongoose.connection.db;
        const users = await db.collection('users').find({}).toArray();

        console.log(`Found ${users.length} users\n`);

        console.log('--- Current Users ---');
        users.forEach(user => {
            console.log(`${user.name} (${user.email}) - Role: ${user.role || 'NOT SET'}`);
        });

        console.log('\n--- Fixing Roles ---');
        let fixed = 0;

        for (const user of users) {
            if (!user.role || user.role === 'undefined' || user.role === null) {
                const newRole = (user.email.includes('doctor') || user.email.includes('dr.')) ? 'doctor' : 'patient';

                await db.collection('users').updateOne(
                    { _id: user._id },
                    { $set: { role: newRole } }
                );

                console.log(`✓ Fixed: ${user.name} → ${newRole}`);
                fixed++;
            }
        }

        console.log(`\n✅ Fixed ${fixed} users`);

        // Show final state
        const updatedUsers = await db.collection('users').find({}).toArray();
        const roleCount = { doctor: 0, patient: 0 };
        updatedUsers.forEach(u => {
            if (u.role === 'doctor') roleCount.doctor++;
            if (u.role === 'patient') roleCount.patient++;
        });

        console.log('\nFinal counts:');
        console.log(`  Doctors: ${roleCount.doctor}`);
        console.log(`  Patients: ${roleCount.patient}`);

        await mongoose.connection.close();
        process.exit(0);
    })
    .catch(error => {
        console.error('Connection error:', error.message);
        process.exit(1);
    });
