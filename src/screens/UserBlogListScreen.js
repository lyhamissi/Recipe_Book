import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { BlogContext } from '../context/BlogContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UserBlogList({ navigation }) {
  const { user } = useContext(UserContext);
  const { blogs } = useContext(BlogContext);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {blogs.length === 0 ? (
          <Text style={styles.emptyText}>No blogs available at the moment.</Text>
        ) : (
          blogs.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => navigation.navigate('UserBlogDetails', { post })}
              style={styles.postCard}
            >
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.subtitle}>{post.summary || 'No summary available'}</Text>
              {post.image ? (
                <Image source={{ uri: post.image }} style={styles.image} />
              ) : null}
              <Text numberOfLines={3} style={styles.content}>{post.content}</Text>
              <Text style={styles.readMore}>Read More →</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomNavbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} color="#7f5539" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('UserProfile')}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.navAvatar} />
          ) : (
            <Icon name="person-circle-outline" size={30} color="#7f5539" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('BlogList')}>
          <Icon name="newspaper-outline" size={24} color="#7f5539" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#7f5539',
    fontSize: 16,
  },
  postCard: {
    backgroundColor: '#f8f4f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5e3023',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9c6644',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: '#3e2c23',
    lineHeight: 22,
  },
  readMore: {
    color: '#7f5539',
    marginTop: 8,
    fontWeight: 'bold',
  },
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#f8f4f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
