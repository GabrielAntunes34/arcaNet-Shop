// Mock file to simulate the access control of router by adding
// A user role in the local storage

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

    if(role === 'client' || role === 'admin') {
        console.log('User mocked!!');
        createMockUser(role);
    }
}

export { createMockUser, simulateUserInQuery };