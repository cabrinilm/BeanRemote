import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  userInfoContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profilePictureContainer: {
    marginRight: 20,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  badgeContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  badgeText: {
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
  },
  editButton: {
    marginHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  postsContainer: {
    paddingHorizontal: 5,
  },
  postRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  postPlaceholder: {
    width: '32%',
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  // ✅ New styles for Sections
  sectionContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  noDataText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },

  // ✅ Styles for Favorite Cafés and Reviews
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  listItemRating: {
    fontSize: 14,
    color: '#ffaa00',
    fontWeight: 'bold',
    marginTop: 5,
  },

  // ✅ Preferences Styling
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  preferenceText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#444',
  },

  postsContainer: {
    paddingHorizontal: 5,
  },
  postRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  postPlaceholder: {
    width: '32%',
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default styles;
