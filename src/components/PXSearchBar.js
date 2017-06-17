import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import { connectLocalization } from './Localization';
import PXHeader from './PXHeader';
import * as searchHistoryActionCreators from '../common/actions/searchHistory';
import { SEARCH_TYPES } from '../common/constants';
import { globalStyles } from '../styles';

class PXSearchBar extends Component {
  static defaultProps = {
    searchType: SEARCH_TYPES.ILLUST,
  };

  handleOnSubmitSearch = e => {
    const {
      navigation,
      addSearchHistory,
      isPushNewSearch,
      onSubmitSearch,
      searchType,
    } = this.props;
    const word = e.nativeEvent.text.trim();
    if (word) {
      const { navigate } = navigation;
      addSearchHistory(word);
      if (onSubmitSearch) {
        onSubmitSearch(word);
      }
      if (isPushNewSearch) {
        navigate('SearchResult', { word, searchType });
      }
    }
  };

  renderSearchBar = () => {
    const {
      searchType,
      onFocus,
      onChangeText,
      autoFocus,
      word,
      i18n,
    } = this.props;
    return (
      <View style={globalStyles.container}>
        <SearchBar
          containerStyle={{
            backgroundColor: '#fff',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          lightTheme
          selectionColor="#90CAF9"
          placeholder={
            searchType === SEARCH_TYPES.USER
              ? i18n.searchUserPlaceHolder
              : i18n.searchPlaceHolder
          }
          autoFocus={autoFocus}
          onFocus={onFocus}
          onChangeText={onChangeText}
          onSubmitEditing={this.handleOnSubmitSearch}
          returnKeyType="search"
          defaultValue={word}
          underlineColorAndroid="transparent"
          spellCheck={false}
        />
      </View>
    );
  };

  render() {
    const {
      word,
      showBackButton,
      headerRight,
      onPressBackButton,
      onFocusSearchBar,
      onChangeSearchText,
    } = this.props;
    return (
      <PXHeader
        headerTitle={this.renderSearchBar()}
        headerRight={headerRight}
        word={word}
        showBackButton={showBackButton}
        onFocusSearchBar={onFocusSearchBar}
        onChangeSearchText={onChangeSearchText}
        onPressBackButton={onPressBackButton}
      />
    );
  }
}

export default connectLocalization(
  withNavigation(
    connect(
      state => ({
        searchType: state.searchType.type,
      }),
      searchHistoryActionCreators,
    )(PXSearchBar),
  ),
);
