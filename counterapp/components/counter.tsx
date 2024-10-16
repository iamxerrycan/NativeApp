import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{count}</Text>

       <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
            <Text style={styles.buttonText}>Increase</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]} onPress={() => setCount(count - 1)}>
            <Text style={styles.buttonText}>Decrease</Text>
          </TouchableOpacity>
        </View>

      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => setCount(0)}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: "100%",
    display:"flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    fontSize: 50,
    marginBottom: 50,
    color: "white"
  },
  button: {
  marginTop: 150,
    backgroundColor: "orange",
    padding: 10,
    alignContent:"space-between",
    borderRadius: 5,
    alignItems: "center",
    width: 140,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonSpacing: {
    marginTop: 10,
  },
  
  resetButton: {
    backgroundColor: "red", 
    marginTop: 20,
  },
  row: {
    flexDirection: "row", 
    justifyContent: "space-between",
    width: "100%", 
    maxWidth: 300, 
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
