export const response = ({res , status = 200 , data , message = "Ok"})=>{
    res.status(status).json({
        data,
        message
    })
}