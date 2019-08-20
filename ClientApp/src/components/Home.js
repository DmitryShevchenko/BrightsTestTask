import React, {Component} from "react"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../store/Home";

class Home extends Component {

    splitUrlData = (data) => {
    debugger;
        let items = [];
        items = data.match(/^[^\n\s$]+/gm);
        return items;
    };

    textAreaOnSubmit = (event) => {
        event.preventDefault();
        let urlArr = this.splitUrlData(this.textInput.value);
        this.props.postData(urlArr);
        this.textInput.value = "";
    };

    render() {
        return (
            <div>
                <form className="ui form" onSubmit={this.textAreaOnSubmit}>
                    <div className="field">
                        <label>Enter Url</label>
                        <textarea ref={(input) => {this.textInput = input}}
                                  placeholder="http://somepage&#10;https://nextpage.com" style={{whiteSpace: "pre-line"}}/>
                    </div>
                    {this.props.isLoading ? <div className="ui segment">
                        <div className="ui active dimmer"
                             style={{width: '100%', height: "48px", backgroundColor: '#41BC4C'}}>
                            <div className="ui loader"/>
                        </div>
                    </div> : <button className="ui button" type='submit' style={{
                        width: '100%',
                        height: "48px",
                        backgroundColor: '#41BC4C',
                        color: '#FFFFFF',
                    }}>Submit</button>}
                </form>
                {this.props.response !== undefined && this.props.response.length !== 0 ?
                    <div>
                        <br/>
                        <table className="ui fixed single line celled table" >
                            <thead>
                            <tr>
                                <th>Url</th>
                                <th>Title</th>
                                <th>StatusCode</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.response.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.url}</td>
                                    <td>{item.title}</td>
                                    <td>{item.statusCode}</td>
                                </tr>)
                            )}
                            </tbody>
                        </table>
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default connect(
    state => state.home,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);