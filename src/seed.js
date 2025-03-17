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

// const storedHash = "$2b$10$u.gQ5EWo/iSHMOuqN8sWZeYeR7mDLyqvnnclj2BAxx7WxNSThZQk2"; // The hashed password from your DB
// const plainPassword = "password123"; // Replace with the password you're trying to check

// bcrypt.compare(plainPassword.trim(), storedHash.trim()).then(isMatch => {
//     console.log(isMatch); // Should log 'true' if the password is correct
//   }).catch(err => console.error(err));

// const bcrypt = require('bcrypt');

// const plainPassword = "password123"; // Same password you're testing

// bcrypt.hash(plainPassword, 10, (err, hash) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Generated Hash:", hash);
// });
const bcrypt = require('bcrypt');

// Function to hash and verify a password
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Enter a password to hash: ", (password) => {
  const saltRounds = 10;

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      readline.close();
      return;
    }

    console.log("Hashed Password:", hash);

    // Compare the password with the generated hash
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        console.error("Error comparing password:", err);
      } else {
        console.log("Password matches:", result); // Should be true
      }
      readline.close();
    });
  });
});
