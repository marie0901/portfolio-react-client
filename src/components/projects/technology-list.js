// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Helpers
import {mediaFileUrl} from '../../utils/helpers';

class TechnologyList extends Component {
  static propTypes = {
    ids: PropTypes.array.isRequired
  }

  generateTechnologies(ids, technologies) {
    if (ids && technologies) {
      const sortedTechnologies = ids.map(t => (technologies[t])).sort((t1, t2) => (t1.name.localeCompare(t2.name)));
      return sortedTechnologies.map(t => (t ? <li key={t.id}><a href={t.url} target='_blank'><img src={mediaFileUrl(t.icon_url)} alt={t.name}/></a></li> : null));
    }
  }

  render() {
    const {ids, technologies} = this.props;
    return (
      <ul className='list-inline'>
        {this.generateTechnologies(ids, technologies)}
      </ul>
    );
  }
}

function mapStateToProps({technologies}) {
  return {technologies}
}

export default connect(mapStateToProps)(TechnologyList);
