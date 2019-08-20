import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/Dashboard";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getAllData();
    }

    ClearButtonOnClick = () => {
        this.props.clearDb();
    };

    render() {
        return (
            <div>
                {
                    this.props.isLoading ? <div className="ui active centered inline loader"/> :
                        <div>
                            <table className="ui fixed single line celled table">
                                <thead>
                                <tr>
                                    <th>Url</th>
                                    <th>Title</th>
                                    <th>StatusCode</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.response !== undefined && this.props.response.length !== 0 ?
                                    this.props.response.map((item, i) => (
                                        <tr key={i}>
                                            <td>{item.url}</td>
                                            <td>{item.title}</td>
                                            <td>{item.statusCode}</td>
                                        </tr>)) : null
                                }
                                </tbody>
                            </table>
                            <button className="ui red button" onClick={this.ClearButtonOnClick}
                                    style={{width: '100%', height: "48px"}}>Clear
                            </button>
                        </div>
                }
            </div>
        );
    }
}


export default connect(
    state => state.dashboard,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Dashboard);