import React from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import EditGoal from '../EditGoal/edit-goal';
import AddToGoal from '../AddToGoal/add-to-goal';
import WithdrawFromGoal from '../WithDrawFromGoal/withdraw-from-goal';
import MoveFromGoal from '../MoveFromGoal/move-from-goal';

import './goal-details.css';

export function GoalDetails(props){

        return(
            <Router>
                <div className="goalDetails">
                    <div className="goalInfo">
                        <p>Your goal is ${props.goalAmount}</p>
                        <p>You saved ${props.savedAmount}</p>
                        <p>You still need ${props.leftAmount} to reach your goal!</p>
                    </div>
                    <div className="edit-goals">
                        <Switch>
                            <Route exact path={`${props.match.url}/`} component={EditGoal} />
                            <Route exact path={`${props.match.url}/add`} render={() => <AddToGoal id={props.id} />} />
                            <Route exact path={`${props.match.url}/move`} render={() => <MoveFromGoal id={props.id}/>} />
                            <Route exact path={`${props.match.url}/withdraw`} component={WithdrawFromGoal} />
                        </Switch>
                    </div>  
                </div>
            </Router>
        )

}

const mapStateToProps = (state) =>{
    return {}
}

export default withRouter(connect(mapStateToProps)(GoalDetails))