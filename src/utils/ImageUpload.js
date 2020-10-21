import ImagePicker from 'react-native-image-picker';

const siteUrl = "http://111.91.225.12:8014/v1/api/user-management/reciept";

export const MultiImageUpload = (token,id) => {

    return new Promise((resolve, reject) => {
      
        const options = {
            quality: 0.0001,
        }
        ImagePicker.showImagePicker(options, (image) => {
            if (image.didCancel) {
               
              } else if (image.error) {
               
              } else if (image.customButton) {
                
              }
              else{
           

           
            var imageName = "fileName"
            let formdata = new FormData();
            formdata.append("upload_reciept", {
                uri: image.uri,
                name: imageName,
                type: image.type
            })
            formdata.append("order_list",id)  // yaha pe  12 dynamic rahega 
            fetch(siteUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "JWT " + token
                },
                body: formdata
            })
                .then((response) => response.json().then(data => {
            
                    if (response.status == 200) {
                   
                        resolve({ "Data": data, "Status:": "success", "imageName": imageName, })
                        // Alert.alert("Profile updated successfully")

                    } else {
                        reject({ "Data": data, "Status:": "failed" })
                        // Alert.alert("Alert for error")
                    }
                }))
                .catch((error) => {
                   
                });
        }}
        )
    })
}