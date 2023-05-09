/*
    404 NOT FOUND CONTROLLER
*/
export const notFound = (req, res, next) => {
	return res.status(404).json({ message: "Ups, Torem's not this way..." });
};
