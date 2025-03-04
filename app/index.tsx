import { FunctionComponent, useRef } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
 
const Index: FunctionComponent<{}> = () => {
  const [permission, requestPermission] = useCameraPermissions()

  const cameraRef = useRef<CameraView>(null)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return

    try {
      const photo = await cameraRef.current.takePictureAsync({})
      console.log(photo)
    } catch (error) {
      console.error("Error taking picture:", error)
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={"back"}
        flash="on"
      >
      </CameraView>

      <TouchableOpacity
        style={styles.btnTapCapture}
        onPress={handleCapture}
      >
        <Text style={{ lineHeight: 50 }}>Take Photo</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  btnTapCapture: {
    height: 50,
    width: "100%",
    alignItems: "flex-end",
    backgroundColor: "green",
    flexDirection: "row",
    justifyContent: "space-evenly",
    bottom: 0,
    position: "absolute",
  }
})
 
export default Index