// React
import React, {Component} from 'react';

// Redux
import {connect} from 'react-redux';
import {addLearningBook} from '../actions';

// Bootstrap components
import {Row, Col} from 'react-bootstrap';

// Components
import Time from 'react-time';
import Breadcrumb from '../components/breadcrumb';
import TagList from '../components/tag-list';
import SocialShareButtons from '../components/social-share-buttons';
import Error from '../pages/error';
import Loading from '../components/loading';

// Routing & Links
import {Link} from 'react-router-dom';
import {learningLink, booksLink, bookLink} from '../links';

// Helpers
import APIHelper from '../utils/api-helpers';
import {mediaFileUrl, arrayFromObject} from '../utils/helpers';

// Media files
import placeholder from '../images/placeholders/book-placeholder.svg';

// Strings
import {genericStrings, learningStrings} from '../strings';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.fetchBook();
  }

  componentWillMount() {
    document.title = booksLink.documentTitle;
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  fetchBook() {
    const {book_id} = this.props.match.params;
    APIHelper.fetchBook(book_id).then(book => {
      this.props.addLearningBook({book});
    }).catch(error => {
      this.setState({error: error});
    });
  }

  generateBookDetails(book) {
    if (!book) {
      return <Loading/>;
    }
    document.title = bookLink(book).documentTitle;
    const cover = book.cover_url ? mediaFileUrl(book.cover_url) : placeholder;

    return (
      <article className='container topic'>
        <header className='inside-header row'>
          <h1 className='content-title col-sm-12'>{book.name}</h1>
          <p className='content-subtitle col-sm-12'>{`${genericStrings.by} `}<strong>{bookLink(book).subtitle}</strong></p>
          <Breadcrumb links={[learningLink, booksLink, bookLink(book)]} />
        </header>
        <div className='inside-body'>
          <Row className='topic-meta edgy'>
            <div className='col-sm-6 topic-date'>
              <span>{`${learningStrings.read}: `}</span>
              <Time value={book.read_at} format='D/M/YYYY'/>
            </div>
            <Col sm={6} className='social-wrap'>
              <span>{genericStrings.share}</span>
              <SocialShareButtons url={window.location.href} title={book.name} summary={book.purchase_url} tagIds={book.tags}/>
            </Col>
          </Row>
          <Row className='topic-content edgy'>
            <Col sm={12}>
              <div className='thb-wrap'>
                <img src={cover} alt='Book cover' className='img-responsive'/>
              </div>
              <div className='topic-free-code'>
                {this.generateBookReview(book.review)}
                {this.generatePurchaseUrl(book.purchase_url)}
              </div>
            </Col>
          </Row>
        </div>
        <footer className='inside-footer edgy'>
          <TagList ids={book.tags} className='tag-list list-unstyled list-inline'/>
        </footer>
      </article>
    );
  }

  generatePurchaseUrl(purchase_url) {
    if (purchase_url) {
      return [
        <h2 key='purchase_url_title'>{learningStrings.purchaseUrl}</h2>,
        <Link key='purchase_url_link' to={purchase_url} target='_blank' rel='noopener'>{purchase_url}</Link>
      ];
    } else {
      return null;
    }
  }

  generateBookReview(review) {
    if (review) {
      return [
        <h2 key='review_title'>{learningStrings.review}</h2>,
        <p key='review_body'>{review}</p>
      ];
    } else {
      return null;
    }
  }

  render() {
    const {error} = this.state;
    if (error) {
      return (
        <Error error={error}/>
      );
    }

    const {books} = this.props.learning ;
    const {book_id} = this.props.match.params;

    var book;
    if (parseInt(book_id, 0)) { // get book by id
      book = books[book_id]
    } else { // get book by url_name
      const booksArray = arrayFromObject(books);
      book = booksArray.filter(b => (b.url_name === book_id))[0]
    }

    return (
      <main className='container-wrap inside-content'>
        {this.generateBookDetails(book)}
      </main>
    )
  }
}

function mapStateToProps({learning}) {
  return {learning}
}

function mapDispatchToProps(dispatch) {
  return {
    addLearningBook: book => dispatch(addLearningBook(book))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
