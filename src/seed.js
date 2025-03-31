// const bcrypt = require('bcrypt');
// const { User } = require('./models');  // Adjust the path based on where your User model is located

// // Function to hash password
// const hashPassword = async (password) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     return hashedPassword;
// };

// // Seed data
// const seedUsers = [
//     {
//         name: 'Test User 1',
//         email: 'testuser1@example.com',
//         password: 'password123',  // Plaintext password will be hashed before saving
//         role: 'user',
//     },
//     {
//         name: 'Test User 2',
//         email: 'testuser2@example.com',
//         password: 'password123',
//         role: 'user',
//     },
//     {
//         name: 'Admin User',
//         email: 'admin@example.com',
//         password: 'adminpassword',
//         role: 'admin',
//     },
// ];

// // Run seed function
// const seedDatabase = async () => {
//     try {
//         console.log('Seeding users...');
//         for (const user of seedUsers) {
//             const hashedPassword = await hashPassword(user.password);
//             await User.create({
//                 name: user.name,
//                 email: user.email,
//                 password: hashedPassword,
//                 role: user.role,
//             });
//         }
//         console.log('Seeding complete!');
//     } catch (error) {
//         console.error('Error seeding database:', error);
//     }
// };

// seedDatabase();
// const bcrypt = require('bcrypt');

// const storedHash = "$2b$10$9kMYILAqnNKKXjFLUkPEp.9ro2mu1ef7szDTNG7vbCGkxSXIxLgYu"; // The hashed password from your DB
// const plainPassword = "Admin1234"; // Replace with the password you're trying to check

// async function checkPassword() {
//     try {
//         const isMatch = await bcrypt.compare(plainPassword.trim(), storedHash.trim());
//         console.log(isMatch); // Should log 'true' if the password is correct
//     } catch (err) {
//         console.error(err);
//     }
// }

// checkPassword();
const bcrypt = require('bcrypt');
const plainPassword = "Admin123";  // The password you're comparing

bcrypt.hash(plainPassword, 10, (err, hash) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Rehashed Password:", hash);
    }
});
