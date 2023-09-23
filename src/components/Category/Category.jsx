import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionItem from '../Question/QuestionItem';

const Category = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    const [category, setCategory] = useState({});
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try{
            const res = await axios.get("/categories/"+id+"/questions");
            if(res.status===200){
                setQuestions(res.data.questions);
                const res2 = await axios.get("/categories/"+id)
                if(res2.status===200){
                    setCategory(res2.data.category)
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
        <h1>سوال های دسته بندی {category.name}:</h1>
        {questions.length>0?questions.map(q=><QuestionItem key={q.id} question={q} />):<h1 className='text-center'>سوالی برای این دسته بندی وجود ندارد</h1>}
    </div>
  )
}

export default Category;