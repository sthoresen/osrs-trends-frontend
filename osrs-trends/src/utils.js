

//Assumes numbers is an object with the number in .value
export const gpFormat = (number) => {

    // Check if the input is a valid number
    number = number.value;
    if (isNaN(number) || !isFinite(number) || number < 0 || number > 2147483647) {
        throw new Error('Number to format is bad. n=:' + number);
    }

    // Convert the number to an integer
    number = Math.floor(number);

    // Convert the number to a string and split it into integer and decimal parts
    const parts = number.toString().split(".");

    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Join the integer and decimal parts
    const formattedNumber = parts.join(".");

    return formattedNumber;

};

//Assumes numbers is an object with the number in .value
//Useful for large numbers
export const volumeFormat = (number) => {

    number = number.value;
    // Check if the input is a valid number
    if (isNaN(number) || !isFinite(number)) {
        throw new Error('Number to format is bad. n=:' + number);
    }

    // Define suffixes for thousand, million, and billion
    const suffixes = ["", "K", "M", "B"];

    // Iterate through the suffixes and apply the appropriate one
    for (let i = suffixes.length - 1; i >= 0; i--) {
        const divisor = Math.pow(10, i * 3);
        if (number >= divisor) {
            // Convert the number to the appropriate magnitude
            const formattedNumber = (number / divisor).toFixed(3);

            // Remove trailing zeros and dot if necessary
            const trimmedNumber = formattedNumber.replace(/\./, '');

            // Use commas for thousands and millions
            const numberWithCommas = trimmedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // Add the suffix and "gp"
            return numberWithCommas + suffixes[i] + " gp";
        }
    }

    // If the number is less than 1000, just add "gp" to the end
    return number.toFixed(0) + " gp";
};

//Assumes numbers is an object with the number in .value
export const percentFormat = (number) => {

    // Check if the input is a valid number
    number = number.value;
    if (isNaN(number) || !isFinite(number) || number > 2147483647) {
        throw new Error('Number to format to percent is bad. n=:' + number);
    }

    // Round to 1 decimal
    number = Math.round(number*100, 1);
    const formattedNumber = number + "%";

    return formattedNumber;

};

// Assumes the format: name@id
export const nameRemoveId = (nameAndId) => {
    const [name] = nameAndId.value.split('@');
    return name;
};


export const limitFormat = (limit) => {
    let s = "" + limit.value;
    return s;
};