import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A2C19',
    marginBottom: 10,
  },
  coffeeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  coffeeDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  cityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A2C19',
    marginBottom: 15,
  },
  detailContainer: {
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  amenityText: {
    fontSize: 14,
    color: '#555',
  },
  gallerySection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  galleryList: {
    flexGrow: 0,
  },
  galleryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  commentsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  commentList: {
    maxHeight: 300,
  },
  commentContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A2C19',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  usefulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  usefulText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 5,
  },
  emptyText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    padding: 20,
  },
  commentInputContainer: {
    marginTop: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#4A2C19',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginPromptContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 16,
    color: '#4A2C19',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});