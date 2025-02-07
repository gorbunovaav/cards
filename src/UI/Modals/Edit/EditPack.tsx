import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './EditPack.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {updatePacks} from "../../../BLL/packs/packs-reducer";
import {IAppStore} from "../../../BLL/store/store";
import {cardPacksType} from "../../../DAL/Packs-api";

type  EditPackPropsType = {
    editModeOff: () => void
    pack: cardPacksType
}


export const EditPack = React.memo((props: EditPackPropsType) => {


    const [name, setname] = useState<string>(props.pack.name);

    const dispatch = useDispatch()
    const currentUserID = useSelector<IAppStore, string>((state) => state.profile._id);


    useEffect(() => {
        const body = document.querySelector('body');
        if (body) body.style.overflow = 'hidden';
        return () => {
            if (body) body.style.overflow = 'auto';
        };
    }, []);

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setname(e.currentTarget.value)
    }

    const onSaveClick = () => {
        dispatch(updatePacks({
            ...props.pack,
            name: name,
            user_id: props.pack.user_id,
        }))
        props.editModeOff()
    }

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrap}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Edit pack name</h2>
                    </div>
                    <p className={styles.text}>Pack name</p>
                    <input
                        type='text'
                        className={styles.input}
                        value={name}
                        onChange={onChangeName}
                    />
                    <div className={styles.wrapBtn}>
                        <button className={styles.btnCancel} onClick={props.editModeOff}>
                            Cancel
                        </button>
                        <button onClick={onSaveClick} className={styles.btnSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

