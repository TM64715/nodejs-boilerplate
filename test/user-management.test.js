import UsersDAO from '../src/dao/usersDAO';

let testUser = {
    googleId: "1234",
    displayName: "Test User"
}

describe("Testing User Management", () => {
    beforeAll(async () => {
        await UsersDAO.injectDB(global.ebClient);
    })
    afterAll(() => {
        UsersDAO.deleteUser(testUser)
    })
    test("Can register a user", async () => {
        const registerResult = await UsersDAO.findOrCreate(testUser);
        expect(registerResult.result).not.toBeNull();
        expect(registerResult.error).toBeNull()
        expect(registerResult.result.googleId).toEqual(testUser.googleId);
        testUser = registerResult.result;
        console.log(testUser);
    })
    test("Can delete a user", async () => {
        console.log(testUser);
        const deleteResult = await UsersDAO.deleteUser(testUser);
        expect(deleteResult.error).toBeNull();
        expect(deleteResult.result.deletedCount).toEqual(1);
    })
})