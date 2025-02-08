const  generatePassword = ()=>{
    const charGroups = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Uppercase
        "abcdefghijklmnopqrstuvwxyz", // Lowercase
        "0123456789",                 // Digits
        "!@#$%^&*()_+-=[]{}|;:',.<>?", // Special characters
    ];

    // Ensure at least one character from each group
    let password = charGroups.map(chars => chars[Math.floor(Math.random() * chars.length)]);

    // Fill the rest of the password with random characters from all groups
    const allChars = charGroups.join('');
    while (password.length < 8) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the array and return the password
    return password
        .sort(() => Math.random() - 0.5) // Simple shuffle
        .join('');
}

module.exports = {generatePassword}

