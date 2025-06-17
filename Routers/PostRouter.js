const Router = require("express")
const router = new Router();
const postController = require("../Controllers/postController");
// const userController =require()

router.post('/',postController.addPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.delete('/:id', postController.deletePost);
router.patch('/:id', postController.editPost);



module.exports = router;