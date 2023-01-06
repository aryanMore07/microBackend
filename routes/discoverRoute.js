const { Router } = require("express")
const route = Router();
const CategoryModel = require("../models/category");
const GalleryModel = require("../models/gallary");

route.get("/like/:imageId", async (req, res, next) => {

    try {
        const imageId = req.body.imageId;

        if(!imageId) {
            res.status(400).send("Bad Request");
        };

        let likeValue;

        const imageDetails = await GalleryModel.findOne({ _id: imageId});

        if(imageDetails) {
            if(imageDetails.likes){
                likeValue = 0;
            } else {
                likeValue = 1;
            };
        };

        await GalleryModel.updateOne(
            { _id : imageId},
            { $set : {likes : likeValue}}
        )

        res.send("Favorite updated successfully");

    } catch (error) {
        console.log(error);
        next(error);
    }
});

route.get("/discover/:category/:shuffle", async (req, res, next) => {
    try {
        const category = req.body.category;
        const shuffle = req.body.shuffle;
        const sortByDate = req.body.sortByDate;
        const filterByLike = req.body.filterByLike;

        if(!category) {
            res.status(400).send("Bad Request");
        };

        let  sort = 1;
        let skip = parseInt(shuffle);

        if(sortByDate) {
            if(sortByDate == "asc") {
                sort = 1;
            } else if(sortByDate == "desc") {
                sort = -1;
            }
        }

        let filter = {};
        if(filterByLike) {
            filter = { likes : 1 };
        }

        const gallaryDetails = await GalleryModel.find({
            category: {$in : [category]},
            ...filter,
        })
        .sort({ createdAt: sort})
        .skip(skip)
        .limit(4)


        res.json(gallaryDetails);
    } catch (error) {
        
    }
});

module.exports = route;