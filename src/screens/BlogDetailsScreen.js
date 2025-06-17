import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlogContext } from '../context/BlogContext';

export default function BlogDetail({ route, navigation }) {
  const { post } = route.params;
  const { deleteBlog } = useContext(BlogContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title,
    });
  }, [navigation, post.title]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Blog',
      'Are you sure you want to delete this blog?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            deleteBlog(post.id);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('AddBlog', { blogToEdit: post });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Icon name="create-outline" size={28} color="#007BFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Icon name="trash-outline" size={28} color="#DC3545" />
        </TouchableOpacity>
      </View>


      {post.image ? (
        <Image source={{ uri: post.image }} style={styles.image} />
      ) : null}

      <Text style={styles.title}>{post.title}</Text>
      {post.summary ? (
        <Text style={styles.subtitle}>{post.summary}</Text>
      ) : null}

      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconButton: {
    marginLeft: 15,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e3023',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9c6644',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  content: {
    fontSize: 18,
    color: '#3e2c23',
    lineHeight: 26,
  },
});
