import { ThumbDownAlt, ThumbUpAlt } from "@mui/icons-material";
import farvardin from "farvardin";
import React from "react";



const Answer = ({answer}) => {

//     const handleLike = async () => {
//         try {
//             const res = await privateAxios.post("/questions/" + question.id + "/like");
//             if (res.status === 200) {
//                 dispatch(showSnackBar({ severity: "success", value: res.data.message }));
//                 getQuestion();
//             }
//         } catch (err) {
//             console.log(err);
//             dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
//         }
//     };

//     const handleDislike = async () => {
//         try {
//             const res = await privateAxios.post("/questions/" + question.id + "/dislike");
//             if (res.status === 200) {
//                 dispatch(showSnackBar({ severity: "success", value: res.data.message }));
//                 getQuestion();
//             }
//         } catch (err) {
//             console.log(err);
//             dispatch(showSnackBar({ severity: "error", value: "خطایی رخ داد لطفا دوباره امتحان کنید" }));
//         }
//     };

    return (
        <div>
            <div className="flex flex-col">
                <h1 className="flex gap-2 text-gray-400">
                    پرسیده شده در
                    <span>
                        {farvardin.gregorianToSolar(
                            new Date(answer.createdAt).getFullYear(),
                            new Date(answer.createdAt).getMonth() + 1,
                            new Date(answer.createdAt).getDate(),
                            "string"
                        )}
                    </span>
                </h1>
       
            </div>
            <div className="flex mb-5 justify-end">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-gray-400">{answer.likes}</span>
                        <ThumbUpAlt
                            // onClick={handleLike}
                            color="success"
                            className="cursor-pointer hover:bg-green-200 transition-all"
                            sx={{ fontSize: "2.5rem" }}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="text-gray-400">{answer.dislikes}</span>
                        <ThumbDownAlt
                            // onClick={handleDislike}
                            color="error"
                            className="cursor-pointer hover:bg-red-200 transition-all"
                            sx={{ fontSize: "2.5rem" }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Avatar src={profile.image && `http://localhost:8000/${profile.image}`} />
                <h1>{answer.title}</h1>
            </div>

            <div className="my-4 flex justify-center">
                <img src={answer.image && `http://localhost:8000/${answer.image}`} />
            </div>

            <p className="m-10">{answer.body}</p>
        </div>
    );
};

export default Answer;
