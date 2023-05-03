import Accommodation from "../models/Accommodation.js";

export const accommodations = async (req, res) => {
    try {

        const Accommodations = await Accommodation.find();
        res.status(200).json({ Accommodations })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

