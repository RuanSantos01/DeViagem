import Scripts from "../models/Scripts.js"

export const getScrips = async (req, res) => {
    try {

        const response = await Scripts.find();

        res.status(200).json(response);

    } catch (err) {

        res.status(500).json(err)

    }
}