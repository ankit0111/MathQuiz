import { StyleSheet, Dimensions } from "react-native";

export const defaultStyles = StyleSheet.create({
    normalText: {
        color: "#fff",
        fontSize: 18,
        textAlign: 'center',
        textTransform:"uppercase",
        fontFamily: "cherry"
    }, 
    normalTextActive: {
        color: "#550051",
        fontSize: 18,
        textAlign: 'center',
        textTransform:"uppercase",
        fontFamily: "cherry"
    }, 
    headingText: {
        fontSize: 30,
        fontFamily: 'erica' ,
        color: "#fff",
        textTransform:"uppercase"
    },
    subHeadingText: {
        fontSize: 16,
        textAlign: "center",
        color: "#fff",
        fontFamily: "cherry"
    },
    engravedText: {
        fontSize: 40,
        fontStyle: "italic",
        color: "#550051",
        fontFamily: "cherry"
    },
    engravedTextActive: {
        fontSize: 40,
        fontStyle: "italic",
        color: "green",
        fontFamily: "cherry"
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontFamily: "cherry",
        fontSize: 20
        
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    alignCenter: {
        alignItems: "center"
    },
    justifyCenter: {
        justifyContent: "center"
    },
    flexRow: {
        flexDirection: "row"
    },
    flexEnd: {
        justifyContent: "flex-end"
    },
    padding30V: {
        paddingVertical: 30
    },
    padding20V: {
        paddingVertical: 20
    },
    padding10V: {
        paddingVertical: 10
    },
    mainWrapper: {

    },
    appContainer: {
        width: (Dimensions.get("window").width > 800) ? 700 : "95%",
        flex: 1        
    },
    container: {
        flex: 1
    },
    box: {
        shadowColor: "#5A0056",
        elevation: 1,
        shadowRadius: 5,
        borderRadius: 8,
        padding: 15
    }
   

})