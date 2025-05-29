import { StyleSheet, View, FlatList, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect } from 'react';
import HomeHeader from '../../components/homeHeader';
import HomeSearch from '../../components/homeSearch';
import NewsCard from '../../components/NewsCard';
import { getBookmarkedArticles } from '../../services/storage';
import bookmarkEvents from '../../services/bookmarkEvents';
import { ThemedText, ThemedView } from '../../components/ThemedComponents';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/slices/rootReducer';
import { fetchArticles, fetchArticlesFromStorage } from '../../redux/actions/newsAction/newsAction';
import NetInfo from '@react-native-community/netinfo';
import { showToast } from '../../utils/toast';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);
  const [refreshing, setRefreshing] = React.useState(false);
  const [bookmarkedTitles, setBookmarkedTitles] = React.useState<string[]>(() => getBookmarkedArticles().map((a: any) => a.title));

  const onRefresh = async () => {
    setRefreshing(true);
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      await dispatch(fetchArticles() as any);
    } else {
      await dispatch(fetchArticlesFromStorage() as any);
      showToast({
        type: 'error',
        message: 'No internet connection',
        duration: 1000,
        position: 'bottom',
      });
    }
    setRefreshing(false);
  };

  useEffect(() => {
    const loadArticles = async () => {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        dispatch(fetchArticles() as any);
      } else {
        dispatch(fetchArticlesFromStorage() as any);
        showToast({
          type: 'error',
          message: 'No internet connection',
          duration: 1000,
          position: 'bottom',
        });
      }
    };
    loadArticles();
  }, [dispatch]);

  // Listen for bookmark changes ONCE at the screen level
  useEffect(() => {
    const updateBookmarks = () => {
      setBookmarkedTitles(getBookmarkedArticles().map((a: any) => a.title));
    };
    bookmarkEvents.addListener('changed', updateBookmarks);
    // Set initial state
    updateBookmarks();
    return () => {
      bookmarkEvents.removeListener('changed', updateBookmarks);
    };
  }, []);


  return (
    <ThemedView style={styles.mainContainer}>
      <View style={[styles.content]}>
        <HomeHeader />
        <HomeSearch />
        <FlatList
          data={articles}
          keyExtractor={item => item.url}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              bookmarked={bookmarkedTitles.includes(item.title)}
            />
          )}
          style={{ marginTop: 16 }}
          ListEmptyComponent={<ArticlesEmptyComponent loading={loading} />}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      </View>
    </ThemedView>
  );
};

// Component for empty or loading state in FlatList
const ArticlesEmptyComponent = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText>No articles found</ThemedText>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 56 : 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
