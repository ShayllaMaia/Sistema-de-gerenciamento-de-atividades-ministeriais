import { createUserService} from "../../services/users/createUser.service.js";

const createUserControler = async (req,res) => {
        const data = req.body;
        
        const newUser = await createUserService(data);

        return res.status(201).json(newUser);

}

export {createUserControler}