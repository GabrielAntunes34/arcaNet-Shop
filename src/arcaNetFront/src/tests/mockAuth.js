// Mock file to simulate the access control of router by adding
// A user role in the local storage
// To become this user you need to put one of the following queries:
// ?user=client
// ?user=admin

const createMockUser = (role) => {
    // Defining an example of user by role
    const mockUser = {
        id: 6,
        name: (role === 'admin') ? 'adm' : 'jorgeTheClient',
        phone: 1499234543,
        adress: 'Pindorama',
        role: (role === 'admin') ? 'admin' : 'client'
    };

    console.log(mockUser);
    // Saving our user at localstorage
    localStorage.setItem("user", JSON.stringify(mockUser));
}

const simulateUserInQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('user');

    // Verifies if you got a user role in the query parameter "user"
    if(role === 'client' || role === 'admin') {
        console.log('User mocked!!');
        createMockUser(role);
    }
}

export { createMockUser, simulateUserInQuery };