# AdMob Configuration

## Google AdMob IDs

### iOS
- **App ID**: `ca-app-pub-8780195722830315~4071218933`
- **Ad Unit ID (Banner)**: `ca-app-pub-8780195722830315/4091045018`

### Android
- **App ID**: `ca-app-pub-8780195722830315~6988671095`
- **Ad Unit ID (Banner)**: `ca-app-pub-8780195722830315/3542689606`

### Test IDs (for development)
- **Banner**: `ca-app-pub-3940256099942544/6300978111`
- **Interstitial**: `ca-app-pub-3940256099942544/1033173712`
- **Rewarded**: `ca-app-pub-3940256099942544/5224354917`

## Implementation Notes

The `react-native-google-mobile-ads` package is installed and configured. App IDs are already set in `app.json`.

### Banner Ad Example:

```typescript
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
    ? 'ca-app-pub-8780195722830315/4091045018'
    : 'ca-app-pub-8780195722830315/3542689606';

<BannerAd
  unitId={adUnitId}
  size={BannerAdSize.BANNER}
  requestOptions={{
    requestNonPersonalizedAdsOnly: false,
  }}
/>
```

### Interstitial Ad Example:

```typescript
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(
  __DEV__ ? TestIds.INTERSTITIAL : 'YOUR_AD_UNIT_ID'
);

// Load the ad
interstitial.load();

// Show when loaded
interstitial.addAdEventListener(AdEventType.LOADED, () => {
  interstitial.show();
});
```

Note: Always use test ad unit IDs during development (`__DEV__` check).
