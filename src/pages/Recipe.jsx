import React, {useEffect, useState} from 'react'
//import styled from 'styled-components';
import {useParams} from "react-router-dom"

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    //const [activeTab, setActiveTab] = useState("instructions");
    const [isSummary, setIsSummary] = useState(true)
    const [isIngredients, setIsIngredients] = useState(false)
    const [isInstructions, setIsInstructions] = useState(false)

    const fetchedDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        setDetails(detailData);
    }

        useEffect(() => {
            fetchedDetails()
        }, [params.name]);
        console.log(details)

        const summaryHandler = ((e) => {
            e.preventDefault()
            setIsSummary(true)
            setIsIngredients(false)
            setIsInstructions(false)
        })
        const ingredientsHandler = ((e) => {
            e.preventDefault()
            setIsSummary(false)
            setIsIngredients(true)
            setIsInstructions(false)
        })
        const instructionsHandler = ((e) => {
            e.preventDefault()
            setIsSummary(false)
            setIsIngredients(false)
            setIsInstructions(true)
        })

  return (
      <div className='container'>
            <h2 className='title'>
                {details.title}
            </h2>
            <div style={{"display": "flex", "justifyContent" : "center"}}>
            <img className="recipeImage" src={details.image} alt="" />
            </div>
            <br/>
            <br/>
        <div className='recipeIcons'>
            <div className='likes'>
            <i className="fas fa-heart" style={{"color":"red"}}></i>
            <p>{details.aggregateLikes} likes</p>
            </div>
        <div className='minutes'>
            <i className="fas fa-alarm-clock" style={{"color":"green"}}></i>
            <p>{details.readyInMinutes}m</p>
            </div>
            </div>
            <br/>
            <br/>
            <div>
                <button className='button is-primary is-light recipeButtons' onClick={summaryHandler}>Summary</button>
                <button className='button is-primary is-light recipeButtons' onClick={ingredientsHandler}>Ingredients</button>
                <button className='button is-primary is-light recipeButtons' onClick={instructionsHandler}>Instructions</button>
            </div>
            {isSummary && (
          <p className='recipeSummary' dangerouslySetInnerHTML={{__html: details.summary}}/>
          ) }
          {isIngredients && (
          <ul className='recipeSummary'>
          {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>

          ))}
      </ul>
          ) }
          {isInstructions && (
          <p className='recipeSummary'>{details.instructions}</p>
          ) }
      </div>
   /*  <DetailWrapper>
        <div>
        <h2>
            {details.title}
        </h2>
        <img src={details.image} alt="" />
        </div>
        <Info>
            <Button
             className={activeTab === "instructions" ? "active" : ""}
             onClick={() => setActiveTab("instructions")}>
                 Instructions
                 </Button>
            <Button
             className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}>
                  Ingredients
                  </Button>
                  {activeTab === "instructions" && (
                         <div>
                         <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                         <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                    </div>
                  )}
                 {activeTab === "ingredients" && (
                     <ul>
                     {details.extendedIngredients.map((ingredient) => (
                         <li key={ingredient.id}>{ingredient.original}</li>

                     ))}
                 </ul>
                 )}
                 
        </Info>
    </DetailWrapper> */
  )
}
/* 
const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    img{
       width: 50%;
    }
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h3{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    border: 2px solid black;
    background: white;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;
`; */

export default Recipe