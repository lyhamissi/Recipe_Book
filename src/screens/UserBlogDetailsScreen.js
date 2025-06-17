import React, { useState, useEffect,useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/UserContext';

export default function UserBlogDetail({ route, navigation }) {
  const { post } = route.params;
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

const { user } = useContext(UserContext); 
const username = user?.username || 'Guest';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title,
    });
  }, [navigation, post.title]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const savedComments = await AsyncStorage.getItem(`comments_${post.id}`);
        if (savedComments) {
          setCommentsList(JSON.parse(savedComments));
        }
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    };
    loadComments();
  }, [post.id]);

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') {
      Alert.alert('Comment is empty', 'Please write something before submitting.');
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      username,
      text: comment.trim(),
    };

    const updatedComments = [...commentsList, newComment];

    try {
      await AsyncStorage.setItem(`comments_${post.id}`, JSON.stringify(updatedComments));
      setCommentsList(updatedComments);
      setComment('');
      Alert.alert('Comment Submitted', 'Your comment has been posted.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your comment.');
      console.error('Failed to save comment:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        {post.image ? (
          <Image source={{ uri: post.image }} style={styles.image} />
        ) : null}

        <Text style={styles.title}>{post.title}</Text>
        {post.summary ? (
          <Text style={styles.subtitle}>{post.summary}</Text>
        ) : null}

        <Text style={styles.content}>{post.content}</Text>

        {/* Comments List */}
        <View style={styles.commentSection}>
          <Text style={styles.commentLabel}>Comments:</Text>
          {commentsList.length === 0 ? (
            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
          ) : (
            commentsList.map(({ id, username, text }) => (
              <View key={id} style={styles.commentItem}>
                <Text style={styles.commentUser}>{username}:</Text>
                <Text style={styles.commentText}>{text}</Text>
              </View>
            ))
          )}
        </View>

        {/* Leave a Comment */}
        <View style={[styles.commentSection, { marginTop: 20 }]}>
          <Text style={styles.commentLabel}>Leave a Comment:</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Write your comment here..."
            multiline
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginBottom: 24,
  },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
  },
  commentLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#5e3023',
  },
  noCommentsText: {
    fontStyle: 'italic',
    color: '#777',
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 12,
  },
  commentUser: {
    fontWeight: '700',
    color: '#7f5539',
  },
  commentText: {
    fontSize: 16,
    color: '#3e2c23',
  },
  commentInput: {
    minHeight: 80,
    borderColor: '#9c6644',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#7f5539',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
