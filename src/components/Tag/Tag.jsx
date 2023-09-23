import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionItem from '../Question/QuestionItem';

const Tag = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const [tag, setTag] = useState({});
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try{
            const res = await axios.get("/tags/"+id+"/questions");
            if(res.status===200){
                setQuestions(res.data.questions);
                const res2 = await axios.get("/tags/"+id)
                if(res2.status===200){
                    setTag(res2.data.tag)
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getQuestions();
    },[])

  return (
    <div className='flex flex-col gap-2 p-10 text-white'>
        <h1>سوال های تگ {tag.name}:</h1>
        {questions.length>0?questions.map(q=><QuestionItem key={q.id} question={q} />):<h1 className='text-center'>سوالی برای این تگ وجود ندارد</h1>}
    </div>
  )
}

export default Tag;