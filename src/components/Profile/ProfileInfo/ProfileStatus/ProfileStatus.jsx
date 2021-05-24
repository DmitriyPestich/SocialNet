import React from "react";


class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateProfileStatus(this.state.status)
    };

    onChangeValue = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    };


    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    {this.props.status ?
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span> :
                        <span onDoubleClick={this.activateEditMode}>-------</span>
                    }

                </div>
                }
                {this.state.editMode &&
                <div>
                    <input autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onChangeValue} type="text" value={this.state.status}/>
                </div>
                }
            </div>
        );
    }
}

export default ProfileStatus;
