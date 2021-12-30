import { LineChart, XAxis, YAxis, Tooltip, Line, ReferenceLine, ResponsiveContainer} from 'recharts';
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import Odometer from 'react-odometerjs';  
import {CustomToolTip} from '../../../store/stockApiInfo'  
import './main.css'  
  

function Main({graphData, isWatchList=false, isSingleAsset=false, isPos}){

    const [hoverPrice, setHoverPrice] = useState(graphData[graphData.length -1].price);
    const [percentDiff, setPercentDiff] = useState(graphData[graphData.length-1]["%"]);
  
    function lineColor(){
        if(isPos === "pos"){
          return "#2eda12";   
        }else{
          return "#FE5001";
        }

    }
  
    useEffect(()=> {
      setPercentDiff(graphData[graphData.length - 1]["%"]);
    }, [graphData])
  
    function handleHover(e){
      if (!isWatchList) {
        if(e.activePayload){
            setHoverPrice(e.activePayload[0].payload.price);
            setPercentDiff(e.activePayload[0].payload["%"]);
  
        };
      };
    };
    
    function resetHover(){
          setHoverPrice(graphData[graphData.length - 1].price);
          setPercentDiff(graphData[graphData.length - 1]["%"]);
    }
  
    return (
      <div className={isWatchList ? "graph-wrapper-wl" : "graph-wrapper"}>
        {isWatchList === false && (
          <div className="graph-odometer-perc">
            <div className="odometer-container">
              <span className="dollar-sign">$</span>
              <Odometer value={hoverPrice} format="(,ddd).dd" />
            </div>
            <p className={`${isPos} p-diff`}>{percentDiff}%</p>
          </div>
        )}
        {graphData && (
          <ResponsiveContainer
            width={isWatchList ? "90%" : "100%"}
            height={isWatchList ? 45 : 300}
            className="graph-container"
          >
            <LineChart
              data={graphData}
              onTouchStart={handleHover}
              onMouseMove={handleHover}
              onMouseLeave={resetHover}
            >
              <XAxis dataKey="time" domain={[graphData[0].time , graphData[3].time]} hide />
              <YAxis
                domain={[
                  graphData[0].price - 5,
                  graphData[graphData.length - 1].price + 5,
                ]}
                hide
              />
              {isWatchList === false && (
                <Tooltip
                content={<CustomToolTip />}
                cursor={{ stroke: "var(--clr-tooltip)", strokeWidth: .8}}
                isAnimationActive={false}
                offset={-20}
                position={{ y: -40 }}
                allowEscapeViewBox={{ x: true, y: true }}
                />
                )}
                <Line
                  dataKey="price"
                  // type={'stepafter'}
                  stroke={lineColor()}
                  dot={false}
                  strokeWidth={isWatchList ? 1 : 2}
                />
              {isSingleAsset || isWatchList ? 
                <ReferenceLine
                  ifOverflow="extendDomain"
                  isFront={false}
                  y={graphData[0].price}
                  strokeWidth={2}
                  strokeHeight={2}
                  strokeDasharray="1 5"
                  stroke="#7F7F7F"
                />
                :
                null
              
            }
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    );  
  };
  
  export default Main;