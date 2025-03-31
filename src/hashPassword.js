const bcrypt = require('bcrypt');
const plainPassword = "Admin123"; // The password you are comparing
const storedHash = "$2b$10$iifF3qcwf22k6PpeB3tV1uKs5TxE5C5kpb9Re.uc5gOK1H.TVQCGe";  // The hash from your DB

bcrypt.compare(plainPassword, storedHash, (err, isMatch) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Password Match:", isMatch); // Should log true if the passwords match
    }
});
