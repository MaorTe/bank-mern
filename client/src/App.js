import React, { useEffect, useRef, useState } from 'react';
import api from './API/api';
import './App.css';
//app
const App = () => {
	// const [value, setValue] = useState('');
	const [userData, setUserData] = useState([]);
	const refMinCash = useRef(null);
	const refIDSingleAcc = useRef(null);

	const refCash = useRef(null);
	const refID = useRef(null);

	const refCredit = useRef(null);
	const refIDCredit = useRef(null);

	const refWithdraw = useRef(null);
	const refIDWithdraw = useRef(null);

	const refTransfer = useRef(null);
	const refIDTransfer1 = useRef(null);
	const refIDTransfer2 = useRef(null);

	const createAccount = async () => {
		const { data } = await api.post('accounts');
		setUserData([data]);
	};

	const getAllAccounts = async () => {
		const { data } = await api.get('accounts');
		setUserData(data);
	};

	const getSingleAccount = async () => {
		const { data } = await api.get(`accounts/${refIDSingleAcc.current.value}`);
		setUserData([data]);
	};

	const filterByCash = async () => {
		const { data } = await api.get(
			`accounts/filter/cash?mincash=${refMinCash.current.value}`
		);
		setUserData(data);
	};

	const depositCash = async () => {
		const obj = { cash: +refCash.current.value };
		const { data } = await api.patch(
			`accounts/${refID.current.value}/cash`,
			obj
		);
		setUserData([data]);
	};

	const updateCredit = async () => {
		const obj = { credit: +refCredit.current.value };
		const { data } = await api.patch(
			`accounts/${refIDCredit.current.value}/credit`,
			obj
		);
		setUserData([data]);
	};

	const withdrawCash = async () => {
		const obj = { cash: +refWithdraw.current.value };
		const { data } = await api.patch(
			`accounts/${refIDWithdraw.current.value}/withdraw`,
			obj
		);
		setUserData([data]);
	};

	const transferCash = async () => {
		const obj = { cash: +refTransfer.current.value };
		const { data } = await api.patch(
			`accounts/${refIDTransfer1.current.value}&${refIDTransfer2.current.value}/transfer`,
			obj
		);
		setUserData([data]);
	};

	return (
		<div
			className="App"
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyItems: 'center',
				alignItems: 'center',
				flexWrap: 'wrap',
			}}>
			<div className="dis-flex">
				<button onClick={getAllAccounts}>Get all accounts</button>
				<button onClick={createAccount}>Add new account</button>
			</div>
			<div className="dis-flex">
				<input ref={refIDSingleAcc} type="text" placeholder="Id" />
				<button onClick={getSingleAccount}>Get single user</button>
			</div>
			<div className="dis-flex">
				<input ref={refID} type="text" placeholder="Id" />
				<input ref={refCash} type="number" placeholder="cash" />
				<button onClick={depositCash}>Deposit cash to a user</button>
			</div>
			<div className="dis-flex">
				<input ref={refIDCredit} type="text" placeholder="Id" />
				<input ref={refCredit} type="number" placeholder="credit" />
				<button onClick={updateCredit}>Update a user credit</button>
			</div>
			<div className="dis-flex">
				<input ref={refIDWithdraw} type="text" placeholder="Id" />
				<input ref={refWithdraw} type="number" placeholder="cash" />
				<button onClick={withdrawCash}>Withdraw cash from a user</button>
			</div>
			<div className="dis-flex">
				<input
					ref={refIDTransfer1}
					type="text"
					placeholder="first account Id"
				/>
				<input
					ref={refIDTransfer2}
					type="text"
					placeholder="second account Id"
				/>
				<input ref={refTransfer} type="number" placeholder="cash" />
				<button onClick={transferCash}>
					Transfer cash from a user to user
				</button>
			</div>

			<div className="dis-flex">
				<input ref={refMinCash} type="number" placeholder="minimum cash" />
				<button onClick={filterByCash}>Filter by minimum cash</button>
			</div>
			<div>
				{userData.map((user, i) => (
					<div
						key={i}
						style={{
							border: '1px solid black',
							margin: '10px',
							padding: '10px',
						}}>
						<span style={{ display: 'flex' }}>_id: {user._id}</span>
						<span style={{ display: 'flex' }}>cash: {user.cash}</span>
						<span style={{ display: 'flex' }}>credit: {user.credit}</span>
						<span style={{ display: 'flex' }}>
							isActive: {user.isActive && user.isActive.toString()}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
