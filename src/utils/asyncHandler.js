const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).reject((err) => next(err))
    }
}

export { asyncHandler }


// H.O.F function which treat other functions as variables either takes as arguement or return as a function


// const asyncHandler = (fn) => async (req, res, next) => {
//     try{
//         await fn(req,res, next)
//     }catch(error){
//         res.status(err.code || 5000).json({
//             success: false,
//             message: err.message})
//     }
// }