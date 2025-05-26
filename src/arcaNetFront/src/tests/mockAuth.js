// Mock file to simulate the access control by adding
// user objects at local storage
// To become this user you need to put one of the following queries:
// ?user=client
// ?user=admin
// Or you can register and login as a personalized client in the dedicated pages!

// Just simulates the validation and return of a login operation
const loginMock = async (email, password) => {
    const user = JSON.parse(localStorage.getItem('userRegistered'));
    console.log(user);

    if((user.email === email) && (user.password === password)) {
        console.log('Passei');
        return user;
    }
    return null;
}

// Passes the validated form data to a user in localStorage
const registerMock = async (formParams) => {
    const mockUser = {
        id: 194,
        name: formParams.name,
        email: formParams.email,
        password: formParams.password,
        phone: formParams.phone,
        adress: formParams.address,
        role: 'client'
    }

    localStorage.setItem('userRegistered', JSON.stringify(mockUser));
}

// Saves a pre defined client or admin at localstorage
const createMockUser = (role) => {
    // Defining an example of user by role
    const mockUser = {
        id: 6,
        name: (role === 'admin') ? 'adm' : 'jorgeTheClient',
        email: 'test@gmail.com',
        password: '1234',
        phone: 1499234543,
        address: 'Pindorama',
        role: (role === 'admin') ? 'admin' : 'client'
    };

    console.log(mockUser);
    // Saving our user at localstorage
    localStorage.setItem('user', JSON.stringify(mockUser));
}

// Calls creatMockUser from query parameters
const simulateUserInQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('user');

    // Verifies if you got a user role in the query parameter "user"
    if(role === 'client' || role === 'admin') {
        console.log('User mocked!!');
        createMockUser(role);
    }
}

export { loginMock, registerMock, createMockUser, simulateUserInQuery };