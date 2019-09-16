import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';


const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'gray',
    },
    cardStyle: {
        padding: 30,
        // backgroundColor: '#ecf9ff',
        backgroundColor: 'yellow',
        borderWidth: 0,
        borderColor: '2px solid black',
        borderRadius: 6,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#808080',
    },
    coloredLine: {
        height: 8,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: '#ff5e59',
    },
    displayText: {
        fontSize: 16,
        margin: 0,
        textAlign: 'center',
    },
})

class IdeaList extends Component {

    constructor(props) {
        super(props);
    }

   

    render() {
        const adminSalaryRanges = [] //this.props.ideas.ideaList.SalaryRange;

        return (
            <View style={styles.containerStyle}>  
                <ScrollView style={{ height: 600 }}>
                    {/* adminSalaryRanges && adminSalaryRanges.length !== 0 && adminSalaryRanges.map((range, index) => { */
                        /* return ( */
                            <TouchableOpacity key={2}>
                                <Card title="Salary Ranges" titleStyle={{ fontSize: 20, color: '#233238', fontWeight: '600' }} containerStyle={styles.cardStyle} dividerStyle={styles.coloredLine}>
                                    <Text style={styles.displayText}>Salary Range Id : {534/* range.SalaryRangeId */}</Text>
                                    <Text style={styles.displayText}>Minimum Salary : {54/* range.MinSalary */}</Text>
                                    <Text style={styles.displayText}>Maximum Salary : {46/* range.MaxSalary */}</Text>
                                    <Text style={styles.displayText}>Average Salary : {6687/* range.AvgSalary */}</Text>
                                    <Text style={styles.displayText}>Load Factor : {1/* range.LoadFactor */}</Text>
                                </Card>
                            </TouchableOpacity>
                        
                    
                   /*  })} */
                        }
                </ScrollView>
            </View>
        )
    }

}

/* function mapStateToProps(state) {
    const getData = getPreparedDashboardData()
    return {
      datas: state,
    };
  }

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getIdeaGroupDashboardData }, dispatch);
  }; */
  
//export default connect(mapStateToProps ,mapDispatchToProps) (IdeaList);
export default IdeaList;