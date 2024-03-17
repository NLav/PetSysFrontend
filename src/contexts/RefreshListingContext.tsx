import { createContext, useState } from "react";

interface IRefreshListingContext {
  refreshListing: boolean;
  setRefreshListing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RefreshListingContext = createContext<IRefreshListingContext>({
  refreshListing: true,
  setRefreshListing: () => {},
});

export const RefreshListingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [refreshListing, setRefreshListing] = useState<boolean>(true);

  return (
    <RefreshListingContext.Provider
      value={{ refreshListing, setRefreshListing }}
    >
      {children}
    </RefreshListingContext.Provider>
  );
};
