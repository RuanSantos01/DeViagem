import Packages from "../models/Packages.js";

export const packages = async (req, res) => {
    try {
        const packages = await Packages.find();
        res.status(200).json({ packages })

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

