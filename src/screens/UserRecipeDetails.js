import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';

export default function UserRecipeDetailsScreen({ route, navigation }) {
  const { recipe } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: recipe.title.length > 20 ? recipe.title.slice(0, 20) + '...' : recipe.title,
    });
  }, [navigation, recipe.title]);

  const handleDownloadPDF = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download the PDF',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Cannot download PDF without storage permission.');
          return;
        }
      }

      const htmlContent = `
        <div style="font-family: Arial, sans-serif;">
          <h1>${recipe.title}</h1>
          ${recipe.image ? `<img src="${recipe.image}" style="width:100%; height:auto; margin-bottom: 20px;" />` : ''}
          <h2>Description</h2>
          <p>${recipe.description || 'No description provided.'}</p>
          <h2>Instructions</h2>
          <p>${recipe.instructions || 'No instructions provided.'}</p>
        </div>
      `;

      const options = {
        html: htmlContent,
        fileName: recipe.title.replace(/\s+/g, '_') + '_Recipe',
        directory: 'Download'
      };

      const file = await RNHTMLtoPDF.convert(options);

      await FileViewer.open(file.filePath, { showOpenWithDialog: true });

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to generate or open PDF. Please try again.');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cont}>
          {recipe.image && (
            <Animatable.Image
              animation="fadeInUp"
              duration={800}
              source={{ uri: recipe.image }}
              style={styles.image}
            />
          )}

          <Animatable.Text animation="fadeInDown" delay={300} style={styles.title}>
            {recipe.title}
          </Animatable.Text>

          <Animatable.Text animation="fadeIn" delay={500} style={styles.description}>
            <Text style={styles.recipe}>Recipe: </Text>
            {recipe.description || 'No description available.'}
          </Animatable.Text>

          <Animatable.Text animation="fadeIn" delay={600} style={styles.instructionsLabel}>
            Instructions:
          </Animatable.Text>
          <Animatable.Text animation="fadeIn" delay={700} style={styles.instructions}>
            {recipe.instructions || 'No instructions available.'}
          </Animatable.Text>

          <Animatable.View animation="zoomIn" delay={800}>
            <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPDF}>
              <Text style={styles.downloadText}>Download PDF</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  cont: {
    backgroundColor: '#f8f4f0',
    padding: 25,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7f5539',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f5555',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  recipe: {
    fontWeight: 'bold',
  },
  instructionsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f5539',
    marginBottom: 8,
    textAlign: 'left',
  },
  instructions: {
    fontSize: 16,
    color: '#7f5555',
    marginBottom: 30,
    lineHeight: 22,
    textAlign: 'left',
  },
  downloadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
