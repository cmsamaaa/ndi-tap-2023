const randomstring = require("randomstring");
const random_name = require("random-name");

exports.random_individual = () => {
    // generate code
    const code_alphabet = randomstring.generate({
        length: 1,
        readable: true,
        charset: 'alphabetic',
        capitalization: 'uppercase'
    });
    const code_numericals = randomstring.generate({
        length: 8,
        readable: true,
        charset: 'numeric'
    });

    // generate nric
    const nric_alphabet = randomstring.generate({
        length: 1,
        readable: true,
        charset: 'alphabetic',
        capitalization: 'uppercase'
    });
    const nric_numericals = randomstring.generate({
        length: 7,
        readable: true,
        charset: 'numeric'
    });

    // generate name
    const firstName = random_name.first();
    const lastName = random_name.last();

    // generate sex
    const sex_numerical = randomstring.generate({
        length: 1,
        charset: '01'
    });

    // generate race
    const race_numerical = randomstring.generate({
        length: 1,
        charset: '012'
    });
    let race = "";
    switch (race_numerical) {
        case "0":
            race = "Chinese";
            break;
        case "1":
            race = "Malay";
            break;
        case "2":
            race = "Indian";
            break;
        default:
            race = "Error";
            break;
    }

    // generate email
    const email = firstName.toLowerCase() + "_" + lastName.toLowerCase() + "@xyz.com";

    return {
        code: "SG" + code_numericals + code_alphabet,
        nric: "S" + nric_numericals + nric_alphabet,
        fullName: firstName + " " + lastName,
        sex: sex_numerical === "1" ? "Male" : "Female",
        race: race,
        email: email
    };
};

exports.random_entity_individual = () => {
    // generate UEN
    const alphabet = randomstring.generate({
        length: 1,
        charset: 'alphabetic',
        capitalization: 'uppercase'
    });
    const numericals = randomstring.generate({
        length: 9,
        charset: 'numeric'
    });

    let profile = this.random_individual();
    profile["entityName"] = random_name.place() + " " + random_name.place();
    profile["UEN"] = "" + numericals + alphabet;

    return profile;
};