import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";      
import { useParams } from 'react-router-dom'
import ReactLoading from 'react-loading' 
import Main from "./StockChart/main";  
import Resolution from './ChartSize/index'  
import KeyStatistics from './StockStats/keystats'
import {setCurrentStock} from '../../store/currentStock'  
import './singlestock.css'


function SingleStock () {
    const dispatch = useDispatch()  
    const {ticker} = useParams() 

    const [resolution, setResolution] = useState('D');
    const [readMore, setReadMore] = useState(false);  

    const {graphData, stockInfo, stockStats, currentPrice} = useSelector(state => state.currentStock)
    let isPos = graphData?.[graphData.length - 1]['%'][0] === '+' ? 'pos' : 'neg'

    const description = stockInfo?.description
    const shortDescription = description?.split(' ').slice(0, 30).join(' ')
    const moreDesctiption = description?.split(' ').slice(30).join(' ')

    const toggleReadMore = () => {
        setReadMore(!readMore)
      }  


    useEffect(()=>{
        (async ()=>{
          await dispatch(setCurrentStock(ticker, resolution))  
        })()
      },[resolution, ticker])  


    return (
        <>
      {stockInfo ? (
        <div className={`main-body`}>
          <div className="main-wrapper">
            <div className={`main-content`}>
              <div className="stock-name">
                <h2>{stockInfo.name}</h2>
              </div>
              {graphData ? (
                <Main
                  graphData={graphData}  
                  isPos={isPos}
                  isSingleAsset={true}
                />
              ) : (
                <ReactLoading
                  type={"bars"}
                  color={"red"}  
                  height={"20%"}
                  width={"20%"}
                />
              )}
              <Resolution
                resolution={resolution}
                setResolution={setResolution}
                isPos={isPos}
              /> 
                <div className="about-section">
                <p className="sa-header">About</p>
                {moreDesctiption ? (
                  <p className="sa-about">
                    {shortDescription} {!readMore ? "..." : moreDesctiption}
                    <span
                      className={`${isPos}-read-more`}
                      onClick={toggleReadMore}
                    >
                      {readMore ? "   View Less" : "   View More"}
                    </span>
                  </p>
                ) : (
                  <p className="sa-about">{shortDescription}</p>
                )}
              </div> 
              <div className="about-section">
                <p className="sa-header">Key Statistics</p>
                <KeyStatistics stockStats={stockStats} />  
              </div>
            </div>
            <div className="bns-container">
             <p>temp</p>    
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-screen">
          <ReactLoading
            type={"bars"}
            color={"var(--clr-secondary)"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      )}
    </>
    )
}

export default SingleStock