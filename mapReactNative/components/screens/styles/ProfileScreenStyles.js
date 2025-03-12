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
});

export default styles;
