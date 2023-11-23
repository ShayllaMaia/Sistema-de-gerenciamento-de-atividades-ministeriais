import { getUserService } from "../../services/users/getUser.service.js"

const getUserControler = async (req, res) => {

    const users = await getUserService();

    return res.status(200).json(users);

};

export { getUserControler };