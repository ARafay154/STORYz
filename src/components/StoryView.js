import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import IconPressable from './iconPressable';
import Label from './text';

const StoryView = (props) => {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  category = props.category;
  const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Stories')
      .where('category', '==', category)
      .onSnapshot(querySnapshot => {
        const pro = [];

        querySnapshot.forEach(documentSnapshot => {
          pro.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setStories(pro);
      });
    return () => unsubscribe();
  }, [category], [stories.like]);

  console.log(stories)




  const showNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prevIndex => prevIndex + 1);
    }
  };

  const showPreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prevIndex => prevIndex - 1);
    } else {
      setCurrentStoryIndex(0);
    }
  };

  const handleLikePress = async () => {
    const story = stories[currentStoryIndex];

    // Retrieve the current story data from Firestore
    const storyRef = firestore().collection('Stories').doc(story.key);
    const doc = await storyRef.get();

    if (doc.exists) {
      const currentLikeStatus = doc.data().like; // Get the current 'like' status

      // Update the 'like' field to its opposite value
      await storyRef.update({
        'like': !currentLikeStatus,
      })
        .then(() => {
          console.log('Like status updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating like status: ', error);
        });
    } else {
      console.error('The story does not exist in the database.');
    }
  };


  const deleteStory = async () => {
    const storyToDelete = stories[currentStoryIndex];

    // Reference to the Firestore collection and documents
    const storiesCollection = firestore().collection('Stories');
    const recycleBinCollection = firestore().collection('RecycleBin');

    try {
      // Get a reference to the story document to be deleted
      const storyDocRef = storiesCollection.doc(storyToDelete.key);
      // Get the data of the story before deleting
      const storyData = (await storyDocRef.get()).data();
      // Move the story to the recycle bin collection
      await recycleBinCollection.doc(storyToDelete.key).set(storyData);
      // Delete the story from the main Stories collection
      await storyDocRef.delete();
      console.log('Story Moved to Recycle Bin and Deleted');
      // Update local state after deletion
      const updatedStories = stories.filter(story => story.key !== storyToDelete.key);

      let updatedIndex = currentStoryIndex;
      if (currentStoryIndex >= updatedStories.length) {
        updatedIndex = Math.max(updatedStories.length - 1, 0);
      }

      setStories(updatedStories);
      if (updatedStories.length > 0) {
        setCurrentStoryIndex(updatedIndex);
      } else {
        setCurrentStoryIndex(0); // Reset index if there are no stories left
      }
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };




  return (
    <View style={[styles.container, stories.length > 0 && styles.withBorder]}>
      {stories.length > 0 && (
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Label text={"Story: " + (currentStoryIndex + 1)} textStyle={styles.text} />
          <Label text={"Total Stories: " + stories.length} textStyle={styles.text} />
        </View>
      )}

      {stories.length > 0 && (
        <ScrollView style={styles.StoryView}>
          <Label text={stories[currentStoryIndex]?.Story} textStyle={styles.text} />
        </ScrollView>
      )}

      {stories.length > 0 && (
        <View style={styles.menuBar}>
          <IconPressable library="Ionicons" name="arrow-back" size={50} color="black" onPress={showPreviousStory} />
          <IconPressable library="AntDesign" name="delete" size={50} color="black" onPress={() => deleteStory()} />
          <IconPressable library="AntDesign" name={(stories[currentStoryIndex] && stories[currentStoryIndex].like) ? 'heart' : 'hearto'} size={50} color={(stories[currentStoryIndex] && stories[currentStoryIndex].like) ? 'red' : 'black'} style={styles.icon} onPress={() => handleLikePress()} />
          <IconPressable library="Ionicons" name="arrow-forward" size={50} color="black" onPress={showNextStory} />
        </View>
      )}
    </View>
  )
}

export default StoryView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '2%',
    padding: '2%'
  },
  withBorder: {
    borderWidth: 5
  },
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1%',
    backgroundColor: 'white'
  },
  StoryView: {
    width: '100%',
    height: "90%",
    padding: '2%'
  },
  text: {
    fontSize: 25,
    lineHeight: 30,
    textAlign: 'justify',
    margin: '2%'
  },

})